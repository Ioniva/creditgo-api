import State from '../entities/state.js';

class StateRepository {
  async getStateByCode (code) {
    return await State.findOne({ where: { code }, attributes: ['id', 'name', 'code', 'created_at', 'updated_at'] });
  }
}

export default new StateRepository();
