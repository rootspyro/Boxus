import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatData } from '../models/Chat';
import { ChatsService } from './chats.service';

export class ChatDataSource extends DataSource<ChatData | undefined> {
  private itemChanges$: BehaviorSubject<ChatData[]>;
  private destroy$: Subject<boolean> = new Subject();
  private pageSize = 10;
  private lastLoadedPage = 0;

  constructor(private chatsService: ChatsService) {
    super();
    this.itemChanges$ = new BehaviorSubject(Array.from<ChatData>({length: 0}));
    this.getAllChats(this.lastLoadedPage);
  }

  connect(collectionViewer: CollectionViewer) {
    collectionViewer.viewChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((range) => {
        const currentPage = Math.floor(range.end / this.pageSize);

        if (currentPage > this.lastLoadedPage) {
          // Updating the page where the user's stay
          this.lastLoadedPage = currentPage;
          this.getAllChats(this.lastLoadedPage);
        }
      });
    return this.itemChanges$;
  }

  getAllChats(offset: number): void {
    this.chatsService
      .getAllChats(offset)
      .pipe(takeUntil(this.destroy$))
      .subscribe((chats) => {
        this.itemChanges$.next([...this.itemChanges$.getValue(), ...chats]) 
      });
  }

  disconnect(): void {
    // Unsusbcribing of connect method
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
