/**
 * name - string
 * duration - number
 * educator - string
 */
interface Course {
	name: string;
	duration?: number; // ? torna variável opcional
	educator: string;
}

class CreateCoursesService {
	//normal
	// execute(data: Course) {console.log(data.name, data.duration, data.educator);}
	//desestruturação
	execute({ duration = 5, name, educator }: Course) {
		console.log(name, duration, educator);
	}
}

export default new CreateCoursesService();
