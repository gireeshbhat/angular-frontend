import { QuickSearchComponent } from './quick-search/quick-search.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PickUpHistoryComponent } from './pick-up-history/pick-up-history.component';

const appRoutes: Routes = [
    { path: 'watchlist', component: WatchListComponent },
    { path: 'pickup-history/:userId', component: PickUpHistoryComponent },
    { path: 'quick-search', component: QuickSearchComponent },
    // otherwise redirect to home
    // { path: '**', redirectTo: 'watchlist' }
];

export const routing = RouterModule.forRoot(appRoutes, {
    useHash: true
});

