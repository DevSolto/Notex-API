import { error } from "console";
import { getTeachersModel } from "../models/teachers";
import { CreateClassParams } from "../types/class";
import { CreateTeacherParams, UpdateTeacherParams } from "../types/teachers";

export async function getTeachersService() {
    return await getTeachersModel()
}

// export async function createTeachersService(createteachersParams: CreateTeacherParams) {
//     const teacherData = await getTeachersModel(createteachersParams.classId);
//     if (!classData) {
//         throw new Error('Classe não encontrada');
//     }
// }
