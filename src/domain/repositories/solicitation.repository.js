import User from '../entities/user.js';
import State from '../entities/state.js';
import RejectionReason from '../entities/rejection-reason.js';
import Solicitation from '../entities/solicitation.js';

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

  async createSolicitation (solicitation, transaction) {
    return await Solicitation.create(solicitation, transaction);
  }
}

export default new SolicitationRepository();
