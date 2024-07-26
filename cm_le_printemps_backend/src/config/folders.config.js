//  fonction de creation des repertoires d'images manquants

import { existsSync, mkdirSync } from "fs";

export function createAllFolder() {
    const userFolder = "./src/public/uploads/users";
    const serviceFolder = "./src/public/uploads/services";

    if (!existsSync(userFolder)) {
        mkdirSync(userFolder, {
            recursive: true,
        });
    }
    
    if (!existsSync(serviceFolder)) {
        mkdirSync(serviceFolder, {
            recursive: true,
        });
    }
}