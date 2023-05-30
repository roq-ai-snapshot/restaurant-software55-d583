import * as yup from 'yup';
import { menuItemValidationSchema } from 'validationSchema/menu-items';
import { notificationValidationSchema } from 'validationSchema/notifications';
import { orderValidationSchema } from 'validationSchema/orders';
import { reservationValidationSchema } from 'validationSchema/reservations';
import { staffValidationSchema } from 'validationSchema/staff';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  owner_id: yup.string().nullable().required(),
  menu_item: yup.array().of(menuItemValidationSchema),
  notification: yup.array().of(notificationValidationSchema),
  order: yup.array().of(orderValidationSchema),
  reservation: yup.array().of(reservationValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
