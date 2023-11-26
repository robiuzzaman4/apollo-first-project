import { Schema, model } from "mongoose";
import validator from "validator";

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from "./student.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    maxlength: [50, "First Name can't be more than 10 characters"],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not capitalized format",
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "First Name is required"],
    validate: {
      validator: function (value: string) {
        return validator.isAlpha(value);
      },
      message: "{VALUE} is not valid",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father Name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact Number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother Name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact Number is required"],
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Contact Number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User Id is required!"],
      unique: true,
      ref: "User"
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not supported",
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (value: string) {
          return validator.isEmail(value);
        },
        message: "{VALUE} is not a valid email",
      },
    },
    contactNo: { type: String, required: [true, "Contact Number is required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency Contact Number is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: {
      type: String,
      required: [true, "Present Address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permenent Address is required"],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian is required"],
    },
    localGuardian: {
      type: localGuradianSchema,
      required: [true, "Local Guardian is required"],
    },
    profileImg: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

/**
 * Mongoose virtual
 */
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre find middlewere / hook
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentSchema.statics.isStudentExists = async (id: string) => {
  return await Student.findOne({ id });
};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
