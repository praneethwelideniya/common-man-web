import { RepaymentFrequencyType } from "@/app/dashboard/components/debt-create-form";
import { UserCreditorEnum } from "@/app/dashboard/debt/users/create/page";

export interface Debt {
  _id: string;
  debitorId: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  creditorId: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  createdBy: string;
  creditorType: UserCreditorEnum.CREDITOR | UserCreditorEnum.USER;
  amount: string;
  currency: string;
  description: string;
  date: Date;
  createdAt: Date;
  interest: string;
  repayment: Repayment;
  status: string;
  dueDate: Date;
  creditorName: string;
  debitorName: string;
}

export interface Repayment {
  repaymentId?: string;
  isInstallments: boolean;
  frequency?: RepaymentFrequencyType & "CUSTOM";
  installments: Array<Installment>;
}

export interface Installment {
  installmentId: string;
  amount: string;
  dueDate: Date;
  paid: boolean;
  paidAt?: Date;
}
