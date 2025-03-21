// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

/**
 * Key of AsyncStorage
 */
export enum StorageKey {
    AUTH_TOKEN = 'AUTH_TOKEN',
}

export class AsyncStorageUtils {
    /**
     * Save value to AsyncStorage
     * @param key -
     * @param value -
     */
    static save(key: StorageKey, value: string): void {
        localStorage.setItem(key, value)
    }

    /**
     * Get value from AsyncStorage
     * @param key -
     */
    static get(key: StorageKey): string | null {
        return localStorage.getItem(key)
    }

    /**
     * Remove value stored in AsyncStorage
     * @param key -
     */
    static remove(key: StorageKey): void {
        return localStorage.removeItem(key)
    }

    /**
     * Get Object from AsyncStorage
     * @param key -
     */
    static getObject<T>(key: StorageKey): T | null {
        const value: string | null = localStorage.getItem(key)
        if (value == null) return null

        return JSON.parse(value) as T
    }

    /**
     * Save Object to AsyncStorage
     * @param key -
     * @param value -
     */
    static saveObject<T>(key: StorageKey, value: T): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static clear(): void {
        localStorage.clear()
    }
}
