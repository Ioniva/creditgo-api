import State from '../entities/state.js';
import RejectionReason from '../entities/rejection-reason.js';
import User from '../entities/user.js';

class SolicitationRepository {
  async getSolicitationsByUserUUID (uuid) {
    return await User.findOne({
      where: { uuid },
      include: [{ model: State }, { model: RejectionReason }]
    });
  }
}

export default new SolicitationRepository();
