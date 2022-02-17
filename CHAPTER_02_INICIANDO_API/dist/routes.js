"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCurse = void 0;
const CreateCoursesService_1 = __importDefault(require("./CreateCoursesService"));
function createCurse(req, res) {
    //normal
    // CreateCoursesService.execute('NodeJS', 2, 'Dani');
    //usando desestruturação
    CreateCoursesService_1.default.execute({
        name: 'NodeJS-Typescript',
        educator: 'Dani',
        //opcional
        duration: 10,
    });
    CreateCoursesService_1.default.execute({
        name: 'ReactJS',
        educator: 'Diego',
        //opcional
        // duration: 10,
    });
    return res.send();
}
exports.createCurse = createCurse;
