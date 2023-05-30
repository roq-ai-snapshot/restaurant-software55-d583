import { NotificationInterface } from 'interfaces/notification';
import { OrderInterface } from 'interfaces/order';
import { ReservationInterface } from 'interfaces/reservation';
import { RestaurantInterface } from 'interfaces/restaurant';
import { StaffInterface } from 'interfaces/staff';

export interface UserInterface {
  id?: string;
  roq_user_id?: string;
  tenant_id?: string;
  notification?: NotificationInterface[];
  order?: OrderInterface[];
  reservation?: ReservationInterface[];
  restaurant?: RestaurantInterface[];
  staff?: StaffInterface[];

  _count?: {
    notification?: number;
    order?: number;
    reservation?: number;
    restaurant?: number;
    staff?: number;
  };
}
