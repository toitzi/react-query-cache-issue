'use server'

import {promises as fs} from "fs";

export async function deleteUserAction(id) {
    const file = await fs.readFile(process.cwd() + '/data/users.json', 'utf8');
    const users = JSON.parse(file)
    return fs.writeFile(process.cwd() + '/data/users.json', JSON.stringify(users.filter(u => u.id !== id), null, 2));
}
