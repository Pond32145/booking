import { HomePage } from './pages/home';
import { MyBookingsPage } from './pages/my-bookings';
import { ProfilePage } from './pages/profile';
import { SupportPage } from './pages/support';
import { VenueDetailsPage } from './pages/venue-details';
import { ServiceBookingPage } from './pages/service-booking';
import { SearchResultsPage } from './pages/search-results';
import { CategoriesPage } from './pages/categories';

export interface RouteConfig {
  path: string;
  exact?: boolean;
  component: React.ComponentType;
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