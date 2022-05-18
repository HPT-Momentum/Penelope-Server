import bodyparser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';

interface Room {
  joinCode: string;
}

const server = express();

let room: Room[] = [];

server.use(cors());
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: true }));
server.set('port', process.env.PORT || 5000);
server.set('trust proxy', true);

async function helloWorldAPI(req: Request, res: Response) {
  res.status(200).send('Hello World API!');
}
async function getRoom(req: Request, res: Response) {
  res.status(200).send(room);
}
async function deleteRoom(req: Request, res: Response) {
  room = [];
  res.status(200).send('Successfully deleted room!');
}

async function postRoom(req: Request, res: Response) {
  if (room.length < 1) {
    room = [{ joinCode: req.query.joinCode as string }];
    res.status(201).send('Great success!');
  } else {
    res.status(409).send('A room already exists!');
  }
}

server.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

const router = express.Router();
router.get('/room', getRoom);
router.post('/room', postRoom);
router.delete('/room', deleteRoom);
router.get('/', helloWorldAPI);
server.use('/api', router);

server.listen(server.get('port'), () => {
  console.log(' App is running at http://localhost:%d in %s mode', server.get('port'), server.get('env'));
});
