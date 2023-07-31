"use client";

import { Category, Companion } from "@prisma/client";
import React from "react";

interface CompanionFormProps {
  initialData?: Companion | null;
  categories?: Array<Category>;
}

const CompanionForm: React.FC<CompanionFormProps> = ({
  initialData,
  categories,
}) => {
  return <div>CompanionForm</div>;
};

export default CompanionForm;
