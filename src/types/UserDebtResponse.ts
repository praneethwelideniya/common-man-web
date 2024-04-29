import { UserCreditorEnum } from "@/types/UserRequest";
import { Installment } from "@/types/Debt";
import { UserType } from "@/types/UserRespose";

export interface InstallmentGroupType {
  installmentNum: string;
  values: Array<Installment>;
  totalAmount: number;
  paidAmount: number;
  duedate: Date;
  paidStatus: "PENDING" | "PAID" | "PARTIAL";
}

export interface UserDebtResponse {
  debtTitle: string;
  nextInstallment?: Installment;
  remainingAmount: number;
  installmentGroup: InstallmentGroupType[];
  _id: string;
  currency: string;
  debitor: UserType;
  creditor: UserType;
  date: Date;
  isInstallments: boolean;
  frequency?: string;
  dueDate: Date;
  status: string;
  amount: number;
  isCreditor: boolean;
  paidAmount: number;
  creditorType: UserCreditorEnum.CREDITOR | UserCreditorEnum.USER;
  historyLog: Array<SortedHistory>;
}

export type SortedHistory = {
  date: string;
  history: Array<string>;
};
