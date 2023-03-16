import Guarantor from '../entities/guarantor.js';
// import User from "../entities/user.js";

class GuarantorRepository {
  // async getGuarantorByUserUUID(uuid) {
  //   return await User.findOne({
  //     include: [{ model: Guarantor }],
  //     where: { uuid },
  //   });
  // }

  async getGuarantorByUUID (uuid) {
    return await Guarantor.findOne({
      where: { uuid },
      attributes: [
        'id',
        'uuid',
        'idEmployeeType',
        'cedula',
        'name',
        'surname',
        'phone',
        'dispatchDate',
        'dispatchPlace',
        'department',
        'city',
        'zip',
        'created_at',
        'updated_at'
      ]
    });
  }

  async updateGuarantorByUserUUID (uuid, guarantor, transaction) {
    return await Guarantor.update(guarantor, { where: { uuid }, transaction });
  }

  async createGuarantor (guarantor, transaction) {
    return await Guarantor.create(guarantor, { transaction, returning: false });
  }

  async deleteGuarantorByUUID (uuid, transaction) {
    return await Guarantor.destroy({ where: { uuid } }, { transaction });
  }
}

export default new GuarantorRepository();
