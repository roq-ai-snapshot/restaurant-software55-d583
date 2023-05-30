import { MenuItemInterface } from 'interfaces/menu-item';
import { NotificationInterface } from 'interfaces/notification';
import { OrderInterface } from 'interfaces/order';
import { ReservationInterface } from 'interfaces/reservation';
import { StaffInterface } from 'interfaces/staff';
import { UserInterface } from 'interfaces/user';

export interface RestaurantInterface {
  id?: string;
  name: string;
  owner_id: string;
  menu_item?: MenuItemInterface[];
  notification?: NotificationInterface[];
  order?: OrderInterface[];
  reservation?: ReservationInterface[];
  staff?: StaffInterface[];
  user?: UserInterface;
  _count?: {
    menu_item?: number;
    notification?: number;
    order?: number;
    reservation?: number;
    staff?: number;
  };
}
