import Agent from "../models/Agent";

export default class AgentRepository {
    async findById(agentId: number): Promise<Agent | null> {
        const trip = await Agent.findByPk(agentId, { raw: true });
        return trip;
    }
}
