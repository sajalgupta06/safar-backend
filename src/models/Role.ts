import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'roles';

export const enum RoleCode {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

export default interface Role extends Document {
  code: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      index:true,
      enum: [RoleCode.CLIENT, RoleCode.OWNER, RoleCode.ADMIN],
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  
  },
  {
    versionKey: false,
    timestamps:true
  },
);

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);
