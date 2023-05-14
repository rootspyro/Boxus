import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatData } from '../models/Chat';
import { ChatsService } from './chats.service';

export class ChatDataSource extends DataSource<ChatData | undefined> {
  private chatsInMemory: ChatData[] = [];
  private chatsChange$: BehaviorSubject<ChatData[]>;
  private destroy$: Subject<boolean> = new Subject();
  private pageSize = 10;
  private offset = 0;

  constructor(private chatsService: ChatsService) {
    super();
    this.chatsChange$ = new BehaviorSubject(this.chatsInMemory);
    this.getAllChats(this.offset);
  }

  connect(collectionViewer: CollectionViewer) {
    collectionViewer.viewChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((range) => {
        const currentPage = Math.floor(range.end / this.pageSize);

        if (currentPage > this.offset) {
          // Updating the page where the user's stay
          this.offset = currentPage;
          this.getAllChats(this.offset);
        }
      });
    return this.chatsChange$;
  }

  getAllChats(offset: number): void {
    this.chatsService
      .getAllChats(offset)
      .pipe(tap((chats) => this.chatsChange$.next(chats)));
  }

  disconnect(): void {
    // Unsusbcribing of connect method
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
