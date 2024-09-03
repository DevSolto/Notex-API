import { getUsersModel } from "../models/users";

export async function getUsersServices(){

    return await getUsersModel()
}