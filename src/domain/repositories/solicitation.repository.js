import User from '../entities/user.js';
import State from '../entities/state.js';
import RejectionReason from '../entities/rejection-reason.js';
import Solicitation from '../entities/solicitation.js';
import Financial from '../entities/financial.js';
import EmployeeType from '../entities/employee_type.js';

class SolicitationRepository {
  async getSolicitationsByUserUUID (uuid) {
    return await User.findOne({
      where: { uuid },
      include: [{ model: Solicitation, include: [{ model: State }, { model: RejectionReason }] }]
    });
  }

  async getSolicitationByUUID (uuid) {
    return await Solicitation.findOne({
      where: { uuid }
      // include: [{ model: State }, { model: RejectionReason }],
    });
  }

  async getPendingSolicitations () {
    return await Solicitation.findAll({
      where: { idState: 5 },
      include: [{ model: User, attributes: ['uuid', 'name', 'surname'] }, { model: State }]
    });
  }

  async createSolicitation (solicitation, transaction) {
    return await Solicitation.create(solicitation, transaction);
  }

  async getSolicitationByUUIDWithUserFinancialData (uuid) {
    return await Solicitation.findOne({
      where: { uuid },
      include: [
        {
          model: User,
          attributes: ['uuid', 'name', 'surname', 'cedula', 'phone', 'genre', 'dispatchDate', 'dispatchPlace'],
          include: [
            {
              model: Financial,
              attributes: ['netMonthlyIncome', 'netMonthlyExpense', 'additionalIncome', 'uuid'],
              include: [{ model: EmployeeType, attributes: ['name'], as: 'employeeType' }]
            }
          ]
        }
      ]
    });
  }

  async updateSolicitationByUUID (uuid, state, transaction) {
    return await Solicitation.update(state, { where: { uuid }, transaction });
  }
}

export default new SolicitationRepository();
