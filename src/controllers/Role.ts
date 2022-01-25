import Role, { RoleModel } from '../models/Role';

export default class RoleController {
  public static findByCode(code: string): Promise<Role | null> {
    return RoleModel.findOne({ code: code, status: true }).lean<Role>().exec();
  }
}
