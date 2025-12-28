export type Student ={
    id : string;
    fullName : string;
    studentType: "Regular" | "Non-Regular";
    className : string;
    academicYear : string;
    totalFees: number;
    amountPaid: number;

};

export const students: Student[] = []