"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCoursesService {
    //normal
    // execute(data: Course) {console.log(data.name, data.duration, data.educator);}
    //desestruturação
    execute({ duration = 5, name, educator }) {
        console.log(name, duration, educator);
    }
}
exports.default = new CreateCoursesService();
