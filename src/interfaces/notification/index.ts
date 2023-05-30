import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface NotificationInterface {
  id?: string;
  user_id: string;
  restaurant_id: string;
  event_type: string;
  message: string;
  created_at: Date;

  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}
