import Dexie from "dexie";
import DexieRelationships from "dexie-relationships";
import noop from "./noop";

class APIWhere {

    constructor() {
        console.log("Creating APIWhere");
    }

}

class APIValues {

    constructor() {
        console.log("Creating APIValues");
    }

}

class APIModel {

    constructor(options = {}) {
        if (!("api" in options)) {
            throw new Error(`Required argument «api» to exist in «options» on «construct» of «${this.modelID}» [0000789436178493216]`);
        }
        Object.assign(this, options);
    }

    async select(where = {}, page = 1, itemsPerPage = 10, sortBy = ["Id"]) {
        try {
            noop(page, itemsPerPage, sortBy);
            if (!(this.modelID in this.api.dexie)) {
                throw new Error(`Required «modelID» (${this.modelID}) to exist in database [00007839178943216]`);
            }
            const modelTable = this.api.dexie[this.modelID];
            const whereProps = Object.keys(where);
            const hasKeys = whereProps.join("").length;
            return this.api.dexie.transaction("rw", modelTable, async () => {
                try {
                    let sentence = modelTable;
                    /*
                    sentence = sentence.orderBy(...sortBy);
                    sentence = sentence.offset(itemsPerPage * (page - 1));
                    sentence = sentence.limit(itemsPerPage);
                    //*/
                    let output = await sentence.toArray();
                    if (hasKeys) {
                        output = output.filter(item => {
                            for(let index = 0; index < whereProps.length; index++) {
                                const whereProp = whereProps[index];
                                const whereValue = where[whereProp];
                                if (item[whereProp] !== whereValue) {
                                    return false;
                                }
                            }
                            return true;
                        });
                    }
                    console.log("Selected data:", this.modelID, output);
                    return {
                        result: output
                    };
                } catch (error) {
                    console.error(`Error on «select transaction»`, error);
                    throw error;
                }
            });
        } catch (error) {
            console.error(`Error on «api.${this.modelID}.select(...)»`, error);
            throw error;
        }
    }

    async insert(apiValuesParam) {
        try {
            const apiValues = [].concat(apiValuesParam);
            const modelTable = this.api.dexie[this.modelID];
            return this.api.dexie.transaction("rw", modelTable, () => {
                return modelTable.bulkAdd(apiValues);
            }).then(data => {
                return data;
            }).catch(error => {
                return error;
            });
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
        } catch (error) {
            console.error(`Error on «api.${this.modelID}.insert(...)»`, error);
            throw error;
        }
    }

    async update(apiWhere, apiValues) {
        try {
            noop(apiWhere, apiValues);
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
            // @TODO...
        } catch (error) {
            console.error(`Error on «api.${this.modelID}.update(...)»`, error);
            throw error;
        }
    }

    async delete(idParam) {
        try {
            const id = parseInt(idParam);
            const modelTable = this.api.dexie[this.modelID];
            return await modelTable.where("Id").equals(id).delete();
        } catch (error) {
            console.error(`Error on «api.${this.modelID}.delete(...)»`, error);
            throw error;
        }
    }

}

class Alimento_Predefinido extends APIModel {

    constructor(...args) {
        super(...args);
        this.modelID = "Alimento_Predefinido";
        this.cascadeDeletes = [];
    }

}

class Alimento_Efectivo extends APIModel {

    constructor(...args) {
        super(...args);
        this.modelID = "Alimento_Efectivo";
        this.cascadeDeletes = [];
    }

}

class Pensamiento_Efectivo extends APIModel {

    constructor(...args) {
        super(...args);
        this.modelID = "Pensamiento_Efectivo";
        this.cascadeDeletes = [];
    }

}

class Pensamiento_Predefinido extends APIModel {

    constructor(...args) {
        super(...args);
        this.modelID = "Pensamiento_Predefinido";
        this.cascadeDeletes = [];
    }

}

class Movimiento_Efectivo extends APIModel {

    constructor(...args) {
        super(...args);
        this.modelID = "Movimiento_Efectivo";
        this.cascadeDeletes = [];
    }

}

class Movimiento_Predefinido extends APIModel {

    constructor(...args) {
        super(...args);
        this.modelID = "Movimiento_Predefinido";
        this.cascadeDeletes = [];
    }

}

class Objetivo_Efectivo extends APIModel {

    constructor(...args) {
        super(...args);
        this.modelID = "Objetivo_Efectivo";
        this.cascadeDeletes = [];
    }

}

class Objetivo_Predefinido extends APIModel {

    constructor(...args) {
        super(...args);
        this.modelID = "Objetivo_Predefinido";
        this.cascadeDeletes = [];
    }

}


class APIBase {

    static create(...args) {
        return new this(...args);
    }

    static Where() {
        return APIWhere;
    }

    static Values() {
        return APIValues;
    }

    constructor() {
        this.settings = {
            appID: "Body in & out",
            appVersion: 4,
        };
        this.state = {
            isPrepared: false,
        };
        this.db = {

            // @ABOUT: food
            Alimento_Predefinido: new Alimento_Predefinido({ api: this }),
            Alimento_Efectivo: new Alimento_Efectivo({ api: this }),
            // @ABOUT: thought
            Pensamiento_Efectivo: new Pensamiento_Efectivo({ api: this }),
            Pensamiento_Predefinido: new Pensamiento_Predefinido({ api: this }),
            // @ABOUT: movement
            Movimiento_Efectivo: new Movimiento_Efectivo({ api: this }),
            Movimiento_Predefinido: new Movimiento_Predefinido({ api: this }),
            // @ABOUT: goals
            Objetivo_Efectivo: new Objetivo_Efectivo({ api: this }),
            Objetivo_Predefinido: new Objetivo_Predefinido({ api: this }),

        };

    }

    async prepareDatabase() {
        try {
            console.log("Preparing database...");
            this.dexie = new Dexie(this.settings.appID, { addons: [DexieRelationships] });
            //const REGEX_SPACES_FINAL = /^[ \t\n\r]+|,[ \t\n\r]+|[ \t\n\r]+$/g;
            this.dexie.version(this.settings.appVersion).stores({

                // @ABOUT: food                
                Alimento_Efectivo: `
                    ++Id,
                    Id_de_Predefinido -> Alimento_Predefinido.Id,
                    &Nombre,
                    Detalles,
                    Fecha,
                    Hora
                `,
                Alimento_Predefinido: `
                    ++Id,
                    &Nombre,
                    Detalles,
                    *Reflexiones
                `,
                
                // @ABOUT: thought
                Pensamiento_Efectivo: `
                    ++Id,
                    Id_de_Predefinido -> Pensamiento_Predefinido.Id,
                    &Nombre,
                    Detalles,
                    Fecha,
                    Hora
                `,
                Pensamiento_Predefinido: `
                    ++Id,
                    &Nombre,
                    Detalles,
                    *Reflexiones
                `,

                // @ABOUT: movement                
                Movimiento_Efectivo: `
                    ++Id,
                    Id_de_Predefinido -> Movimiento_Predefinido.Id,
                    &Nombre,
                    Detalles,
                    Fecha,
                    Hora
                `,
                Movimiento_Predefinido: `
                    ++Id,
                    &Nombre,
                    Detalles,
                    *Reflexiones
                `,
                
                // @ABOUT: goals                
                Objetivo_Efectivo: `
                    ++Id,
                    Id_de_Predefinido -> Objetivo_Predefinido.Id,
                    &Nombre,
                    Detalles,
                    Fecha,
                    Hora
                `,
                Objetivo_Predefinido: `
                    ++Id,
                    &Nombre,
                    Detalles,
                    *Reflexiones
                `,

                // @ABOUT: daily minimums
                Minimas_Intensidades_Diarias: `
                    ++Id,
                    &Nombre,
                    Datos
                `

            });
            console.log("Database prepared successfully!");
        } catch (error) {
            console.error(`Error on «api.prepareDatabase(...)»:`, error);
            throw error;
        }
    }

}

class API extends APIBase {

    // @TODO: add specific methods...
    async getAllPrototypes() {
        try {
            const models = [
                [this.db.Alimento_Predefinido, "Alimento_Predefinido"],
                [this.db.Pensamiento_Predefinido, "Pensamiento_Predefinido"],
                [this.db.Movimiento_Predefinido, "Movimiento_Predefinido"],
                [this.db.Objetivo_Predefinido, "Objetivo_Predefinido"],
            ];
            const allPrototypes = {};
            for (let indexModel = 0; indexModel < models.length; indexModel++) {
                const [model, modelID] = models[indexModel];
                const { result } = await model.select();
                allPrototypes[modelID] = result;
            }
            return allPrototypes;
        } catch (error) {
            console.error(error);
        }
    }

    pad(pad, str, padLeft) {
        if (typeof str === 'undefined')
            return pad;
        if (padLeft) {
            return (pad + str).slice(-pad.length);
        } else {
            return (str + pad).substring(0, pad.length);
        }
    }

    formatFechaInversa(currentDate) {
        return `${this.pad("00", currentDate.getDate(), true)}-${this.pad(
            "00",
            currentDate.getMonth() + 1,
            true
        )}-${currentDate.getFullYear()}`;
    }

    formatFecha(currentDate) {
        return `${currentDate.getFullYear()}-${this.pad(
            "00",
            currentDate.getMonth() + 1,
            true
        )}-${this.pad("00", currentDate.getDate(), true)}`;
    }

    formatHora(currentDate) {
        return `${this.pad(
            "00",
            currentDate.getHours(),
            true
        )}:${this.pad(
            "00",
            currentDate.getMinutes(),
            true
        )}:${this.pad("00", currentDate.getSeconds())}`;
    }

    formatDate(date) {
        return `${this.pad("00", date.getDate(), true)}/${this.pad(
            "00",
            date.getMonth() + 1,
            true
        )}/${date.getFullYear()}`;
    }

    formatDateUntilSeconds(date) {
        return `${this.pad("00", date.getDate(), true)}/${this.pad(
            "00",
            date.getMonth() + 1,
            true
        )}/${date.getFullYear()} ${this.pad("00", date.getHours(), true)}:${this.pad("00", date.getMinutes(), true)}.${this.pad("00", date.getSeconds(), true)}.${this.pad("000", date.getMilliseconds(), true)}`;
    }

    async saveConcatenations(data, accs = []) {
        try {
            if(data.AssociatedConsequences) {
                console.log("Save concatenations of:", data);
                for(let indexAssociated = 0; indexAssociated < data.AssociatedConsequences.length; indexAssociated++) {
                    const associatedConsequenceOriginal = data.AssociatedConsequences[indexAssociated];
                    const associatedConsequence = Object.assign({}, associatedConsequenceOriginal);
                    const oldTable = associatedConsequence.destinationType;
                    const destinationTable = oldTable;
                    associatedConsequence.asPrototype = false;
                    // console.log("associatedConsequence", associatedConsequence, destinationTable);
                    const currentDate = new Date();
                    associatedConsequence.Fecha = this.formatFecha(currentDate);
                    associatedConsequence.Hora = this.formatHora(currentDate);
                    associatedConsequence.HechoOriginal = data;
                    await this.saveData(associatedConsequence, destinationTable, accs);
                }
            }
        } catch (error) {
            console.error("Error on «saveConcatenations»:", error);
            throw error;
        }
    }
    
    async saveData(dataParam, tablenameParam, accs = []) {
        try {
            const data = Object.assign({}, dataParam);
            const asPrototype = data.asPrototype === true;
            const tablename = asPrototype ? this.toPrototypeTable(tablenameParam) : this.toFactTable(tablenameParam);
            const uid = tablename + "+" + data.Id;
            console.log("Save data on:", tablename, data, uid);
            if (!uid.endsWith("+undefined")) {
                if (accs.indexOf(uid) !== -1 ) {
                    throw new Error(`Required «consequences» to not be cyclic (${uid}) [0000431267854378912]`);
                }
                accs.push(uid);
            }
            if(!(tablename in this.db)) {
                throw new Error(`Required tablename «${tablename}» to exist as table in database [0004317843912689]`);
            }
            const props = Object.keys(data);
            for(let index = 0; index < props.length; index++) {
                const prop = props[index];
                if(prop.match(/^([^A-Z]|destinationType)/g)) {
                    delete data[prop];
                }
            }
            if(asPrototype) {
                delete data.Fecha;
                delete data.Hora;
            }
            if (!data.Intensidad) {
                data.Intensidad = 1;
            }
            if(!asPrototype) {
                const dateFormatted = this.formatDateUntilSeconds(new Date());
                Object.assign(data, {
                    Nombre: data.Nombre + ` [${dateFormatted}]`,
                });
            }
            const response = await this.db[tablename].insert(data);
            console.log("response", response);
            if(!asPrototype) {
                await this.saveConcatenations(data, accs)
            }
            return response;
        } catch (error) {
            console.error("Error on «saveData:", error);
            throw error;
        }
    }

    async deleteData(tablename, idParam) {
        try {
            const id = parseInt(idParam);
            const resultDelete = await this.dexie[tablename].where("Id").equals(id).delete();
            return resultDelete;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    toTable(s) {
        if (["food", "alimento"].indexOf(s.toLowerCase()) !== -1) {
            return "Alimento";
        } else if (["thought", "pensamiento"].indexOf(s.toLowerCase()) !== -1) {
            return "Pensamiento";
        } else if (["movement", "movimiento"].indexOf(s.toLowerCase()) !== -1) {
            return "Movimiento";
        } else if (["goals", "objetivo"].indexOf(s.toLowerCase()) !== -1) {
            return "Objetivo";
        }
    }

    toPrototypeTable(s) {
        return this.toTable(s) + "_Predefinido";
    }

    toFactTable(s) {
        return this.toTable(s) + "_Efectivo";
    }

    async getTodayGoals() {
        try {
            const allObjetivos = await this.dexie.Objetivo_Efectivo.toArray();
            return allObjetivos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getMinimumDailyGoalIntensities() {
        try {
            let dailyGoals = await this.dexie.Minimas_Intensidades_Diarias.where("Nombre").equals("Daily").toArray();
            if (dailyGoals.length === 0) {
                await this.dexie.Minimas_Intensidades_Diarias.bulkAdd([{ Nombre: "Daily", Datos: {} }]);
                dailyGoals = await this.dexie.Minimas_Intensidades_Diarias.where("Nombre").equals("Daily").toArray();
            }
            console.log(dailyGoals, "dailyGoals");
            return dailyGoals;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async setMinimumDailyGoalIntensities(dailyGoalIntensities) {
        try {
            const [{Id}] = await this.dexie.Minimas_Intensidades_Diarias.where("Nombre").equals("Daily").toArray();
            console.log("Id", Id, "dailyGoalIntensities", dailyGoalIntensities);
            const updateResult = await this.dexie.Minimas_Intensidades_Diarias.update(Id, dailyGoalIntensities);
            return updateResult;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


}

export default API;