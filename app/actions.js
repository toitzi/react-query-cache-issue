'use server'

import {promises as fs} from "fs";

export async function deleteUserAction(id) {
    const file = await fs.readFile(process.cwd() + '/data/users.json', 'utf8');
    const users = await JSON.parse(file)
    return fs.writeFile(process.cwd() + '/data/users.json', JSON.stringify(users.filter(u => u.id !== id), null, 2));
}

export async function getUserAction() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const file = await fs.readFile(process.cwd() + '/data/users.json', 'utf8');
    return JSON.parse(file)
}
