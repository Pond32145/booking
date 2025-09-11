import { HomePage } from './features/home/page';
import { MyBookingsPage } from './features/booking/my-bookings-page';
import { ProfilePage } from './features/profile/page';
import { SupportPage } from './features/support/page';
import { VenueDetailsPage } from './features/booking/venue-details-page';
import { ServiceBookingPage } from './features/booking/page';
import { SearchResultsPage } from './features/search/page';
import { CategoriesPage } from './features/categories/page';

export interface RouteConfig {
  path: string;
  exact?: boolean;
  component: React.ComponentType;
  protected?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/categories',
    component: CategoriesPage,
  },
  {
    path: '/my-bookings',
    component: MyBookingsPage,
  },
  {
    path: '/profile',
    component: ProfilePage,
    protected: true,
  },
  {
    path: '/support',
    component: SupportPage,
  },
  {
    path: '/venue/:id',
    component: VenueDetailsPage,
  },
  {
    path: '/booking/:venueId/:serviceId',
    component: ServiceBookingPage,
  },
  {
    path: '/search',
    component: SearchResultsPage,
  },
];