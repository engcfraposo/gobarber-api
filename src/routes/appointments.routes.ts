import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/appointment.repository'
import CreateAppointmentService from '../services/createAppointment.service'

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (_request: Request, response: Response) => {
    const appointments = appointmentsRepository.all()
    return response.json(appointments);
})

appointmentsRouter.post('/', (request: Request, response: Response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date)

        const createAppointment = new CreateAppointmentService(appointmentsRepository);

        const appointment = createAppointment.execute({date: parsedDate, provider})

        return response.json(appointment);
    } catch (error) {
        return response.status(400).json({error: error.message})
    }
})



export default appointmentsRouter;