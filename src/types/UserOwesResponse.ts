import { UserCreditorEnum } from "@/types/UserRequest";

export interface UserOwesResponse {
  _id: string;
  fullName: string;
  phoneNumber?: string;
  email?: string;
  oweTo: number;
  oweFrom: number;
  creditorType?: UserCreditorEnum.USER | UserCreditorEnum.CREDITOR;
}

export interface DashboardResponse {
  userOwes: UserOwesResponse[];
  totalOweTo: number;
  totalOweFrom: number;
  upcomingPayments: UpcomingPaymentsType[];
  //   upcomingReceives: UpcomingPayments[];
}

export interface UpcomingPaymentsType {
  debtId: string;
  name: string;
  amount: number;
  dueDate: Date;
  type: "PAYMENT" | "RECEIVE";
}
