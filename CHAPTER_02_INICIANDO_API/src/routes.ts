import { Request, Response } from 'express';
import CreateCoursesService from './CreateCoursesService';
export function createCurse(req: Request, res: Response) {
	//normal
	// CreateCoursesService.execute('NodeJS', 2, 'Dani');
	//usando desestruturação
	CreateCoursesService.execute({
		name: 'NodeJS-Typescript',
		educator: 'Dani',
		//opcional
		duration: 10,
	});
	CreateCoursesService.execute({
		name: 'ReactJS',
		educator: 'Diego',
		//opcional
		// duration: 10,
	});
	return res.send();
}
