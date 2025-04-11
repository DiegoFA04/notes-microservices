import * as joi from 'joi';
import 'dotenv/config';

interface EnvironmnetVaribles {
    NATS_SERVER: string;
}

const environmentSchema = joi.object({
    NATS_SERVER: joi.string().required(),
}).unknown();

const { error, value } = environmentSchema.validate({
    ...process.env
})

if (error) {
    throw new Error(`Environment variables validation error: ${error.message}`);
}

const environmnetVaribles: EnvironmnetVaribles = value;

export const environmnets = {
    natsServer: environmnetVaribles.NATS_SERVER,
}