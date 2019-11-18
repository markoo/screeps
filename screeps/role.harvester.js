
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.transfering && creep.carry.energy == 0) {
            creep.memory.transfering = false;
        }
        if (!creep.memory.transfering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transfering = true;
        }
        if (!creep.memory.transfering) {
            let room = creep.room.name;
            if (room == 'W43N1') {
                var harvestersA = _.filter(Game.creeps, (creep) => creep.memory.role == 'AlanopolisHarvester');

                var sources = creep.room.find(FIND_SOURCES);
                var key = 0;
                _.forEach(harvestersA, function (harvester) {
                    harvester.say('H' + key);
                    if (harvester.harvest(sources[key]) == ERR_NOT_IN_RANGE) {
                        harvester.moveTo(sources[key]);
                    }
                    key = key + 1;
                });
            } else if (room == 'W43N2') {
                var harvestersA = _.filter(Game.creeps, (creep) => creep.memory.role == 'StevenopolisHarvester');

                var sources = creep.room.find(FIND_SOURCES);
                var key = 0;
                _.forEach(harvestersA, function (harvester) {
                    harvester.say('H' + key);
                    if (harvester.harvest(sources[key]) == ERR_NOT_IN_RANGE) {
                        harvester.moveTo(sources[key]);
                    }
                    key = key + 1;
                });
            } else if (room == 'W43N3') {
                var harvestersA = _.filter(Game.creeps, (creep) => creep.memory.role == 'MarkopolisHarvester');

                var sources = creep.room.find(FIND_SOURCES);
                var key = 0;
                _.forEach(harvestersA, function (harvester) {
                    harvester.say('H' + key);
                    if (harvester.harvest(sources[key]) == ERR_NOT_IN_RANGE) {
                        harvester.moveTo(sources[key]);
                    }
                    key = key + 1;
                });
            } else if (room == 'W39S1') {
                var harvestersA = _.filter(Game.creeps, (creep) => creep.memory.role == 'MichaelopolisHarvester');

                var sources = creep.room.find(FIND_SOURCES);
                var key = 0;
                _.forEach(harvestersA, function (harvester) {
                    if (harvester.carry.energy !== harvester.carryCapacity) {
                        harvester.say('H' + key + ' ' + harvester.carry.energy);
                        if (harvester.harvest(sources[key]) == ERR_NOT_IN_RANGE) {
                            harvester.moveTo(sources[key]);
                        }
                    }
                    key = key + 1;
                });
            } else if (room == 'W39S3') {
                var harvestersA = _.filter(Game.creeps, (creep) => creep.memory.role == 'JosephineopolisHarvester');

                var sources = creep.room.find(FIND_SOURCES);
                var key = 0;
                _.forEach(harvestersA, function (harvester) {
                    if (harvester.carry.energy !== harvester.carryCapacity) {
                        harvester.say('H' + key + ' ' + harvester.carry.energy);
                        if (harvester.harvest(sources[key]) == ERR_NOT_IN_RANGE) {
                            harvester.moveTo(sources[key]);
                        }
                    }
                    key = key + 1;
                });
            } else if (room == 'W39S2') {
                var harvestersA = _.filter(Game.creeps, (creep) => creep.memory.role == 'EliseopolisHarvester');

                var sources = creep.room.find(FIND_SOURCES);
                var key = 0;
                _.forEach(harvestersA, function (harvester) {
                    if (harvester.carry.energy !== harvester.carryCapacity) {
                        harvester.say('H' + key + ' ' + harvester.carry.energy);
                        if (harvester.harvest(sources[key]) == ERR_NOT_IN_RANGE) {
                            harvester.moveTo(sources[key]);
                        }
                    }
                    key = key + 1;
                });
            } else if (room == 'W41S6') {
                var harvestersA = _.filter(Game.creeps, (creep) => creep.memory.role == 'FionaopolisHarvester');

                var sources = creep.room.find(FIND_SOURCES);
                var key = 0;
                _.forEach(harvestersA, function (harvester) {
                    if (harvester.carry.energy !== harvester.carryCapacity) {
                        harvester.say('H' + key + ' ' + harvester.carry.energy);
                        if (harvester.harvest(sources[key]) == ERR_NOT_IN_RANGE) {
                            harvester.moveTo(sources[key]);
                        }
                    }
                    key = key + 1;
                });
            } else if (room == 'W41S7') {
                var harvestersA = _.filter(Game.creeps, (creep) => creep.memory.role == 'CamillaopolisHarvester');
                var sources = creep.room.find(FIND_SOURCES);
                var key = 0;
                _.forEach(harvestersA, function (harvester) {
                    if (harvester.carry.energy !== harvester.carryCapacity) {
                        harvester.say('H' + key + ' ' + harvester.carry.energy);
                        if (harvester.harvest(sources[key]) == ERR_NOT_IN_RANGE) {
                            harvester.moveTo(sources[key]);
                        }
                    }
                    key = key + 1;
                });
            } else {
                const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if (source) {
                    let room = creep.room.name;
                    if (room == 'W44N1') {
                        console.log('whats up:', creep.harvest(source));
                    }
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
                creep.say('H');
            }
        }
        else {
            let link1 = Game.getObjectById('5a750dd26950211c7f075e9e');
            let link2 = Game.getObjectById('5b89640f3209e9216ec441b5');
            let linkW43N2 = Game.getObjectById('5a64ca3a77a3df759890fc4d');
            const linkW39S1_H1 = Game.getObjectById('5bf866d770d7a0719caccd8b');
            const linkW39S1_H2 = Game.getObjectById('5c055c50f8e1cf2206a0575e');
            const linkW39S3_H1 = Game.getObjectById('5c0f9a84bb12a97b2eeb42ad');
            const linkW39S2_H1 = Game.getObjectById('5c2303de06520a2ad5fe3955');
            const linkW39S2_H3 = Game.getObjectById('5c2e9d338a7611098cc967fb');
            const linkW41S6_H1 = Game.getObjectById('5c8ffcd2c5af143e6d37de10');
            const linkW41S6_H2 = Game.getObjectById('5c992599d88dce34cbdef5b2');
            const linkW41S7_H1 = Game.getObjectById('5cc59e61a94d1b640e60fe3b');
            const linkW41S7_H2 = Game.getObjectById('5cd114b3bda4ba4a8192a5bf');
            const linkW44N2_H1 = Game.getObjectById('5d01169bbdf94d78277824d0');

            if (creep.room.name == 'W43N1' && creep.pos.findPathTo(link1).length < 7) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'AlanopolisHarvester');
                if (harvesters[0].transfer(link1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[0].moveTo(link1);
                }
            } else if (creep.room.name == 'W43N1' && creep.pos.findPathTo(link2).length < 7) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'AlanopolisHarvester');
                if (harvesters.length > 1 && harvesters[1].transfer(link2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[1].moveTo(link2);
                }
            } else if (creep.room.name == 'W43N2' && creep.pos.findPathTo(linkW43N2).length < 7 && linkW43N2.energy < 300) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'StevenopolisHarvester');
                if (harvesters[0].transfer(linkW43N2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[0].moveTo(linkW43N2);
                }
            } else if (creep.room.name == 'W39S1' && creep.pos.findPathTo(linkW39S1_H1).length < 7 && linkW39S1_H1.energy < 550) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'MichaelopolisHarvester');
                if (harvesters.length > 1 && harvesters[1].transfer(linkW39S1_H1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[1].moveTo(linkW39S1_H1);
                }
            } else if (creep.room.name == 'W39S1' && creep.pos.findPathTo(linkW39S1_H2).length < 7 && linkW39S1_H2.energy < 550) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'MichaelopolisHarvester');
                if (harvesters.length > 0 && harvesters[0].transfer(linkW39S1_H2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[1].moveTo(linkW39S1_H2);
                }
            } else if (creep.room.name == 'W39S3' && creep.pos.findPathTo(linkW39S3_H1).length < 7 && linkW39S3_H1.energy < 550) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'JosephineopolisHarvester');
                if (harvesters.length > 1 && harvesters[1].transfer(linkW39S3_H1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[1].moveTo(linkW39S3_H1);
                }
            } else if (creep.room.name == 'W39S2' && creep.pos.findPathTo(linkW39S2_H1).length < 7 && linkW39S2_H1.energy < 550) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'EliseopolisHarvester');
                if (harvesters.length > 1 && harvesters[1].transfer(linkW39S2_H1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[1].moveTo(linkW39S2_H1);
                }
            } else if (creep.room.name == 'W39S2' && creep.pos.findPathTo(linkW39S2_H3).length < 777 && linkW39S2_H3.energy < 550) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'EliseopolisHarvester');
                if (harvesters.length > 0 && harvesters[0].transfer(linkW39S2_H3, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[0].moveTo(linkW39S2_H3);
                }
            } else if (creep.room.name == 'W41S6' && creep.pos.findPathTo(linkW41S6_H1).length < 7 && linkW41S6_H1.energy < 550) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'FionaopolisHarvester');
                if (harvesters.length > 0 && harvesters[0].transfer(linkW41S6_H1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[0].moveTo(linkW41S6_H1);
                }
            } else if (creep.room.name == 'W41S6' && creep.pos.findPathTo(linkW41S6_H2).length < 7 && linkW41S6_H2.energy < 550) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'FionaopolisHarvester');
                if (harvesters.length > 1 && harvesters[1].transfer(linkW41S6_H2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[1].moveTo(linkW41S6_H2);
                }
            } else if (creep.room.name == 'W41S7' && creep.pos.findPathTo(linkW41S7_H1).length < 7 && linkW41S7_H1.energy < 550) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'CamillaopolisHarvester');
                if (harvesters.length > 1 && harvesters[0].transfer(linkW41S7_H1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[0].moveTo(linkW41S7_H1);
                }
            } else if (creep.room.name == 'W41S7' && creep.pos.findPathTo(linkW41S7_H2).length < 7 && linkW41S7_H2.energy < 550) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'CamillaopolisHarvester');
                if (harvesters.length > 1 && harvesters[1].transfer(linkW41S7_H2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[1].moveTo(linkW41S7_H2);
                }
            } else if (creep.room.name == 'W44N2' && creep.pos.findPathTo(linkW44N2_H1).length < 7 && linkW44N2_H1.energy < 550) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'MeinkeopolisHarvester');
                if (harvesters.length > 0 && harvesters[0].transfer(linkW44N2_H1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[0].moveTo(linkW44N2_H1);
                }
            } else if (creep.room.name == 'W44N2' && creep.pos.findPathTo(linkW44N2_H1).length < 7 && linkW44N2_H1.energy < 550) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'MeinkeopolisHarvester');
                if (harvesters.length > 1 && harvesters[1].transfer(linkW44N2_H1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[1].moveTo(linkW44N2_H1);
                }
            } else {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.energy < structure.energyCapacity);
                    }
                });
                if (target) {
                    creep.say('Extension');
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#333333' } });
                    }
                } else {
                    target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return ((structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity));
                        }
                    });
                    if (target) {
                        creep.say('Container');
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    } else {
                        creep.say('Storage');
                        var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_STORAGE ||
                                    (structure.structureType == STRUCTURE_TOWER &&
                                        structure.energy < structure.energyCapacity));
                            }
                        });
                        if (creep.transfer(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(theStorage);
                        }
                    }
                }
            }
        }
    }
};
module.exports = roleHarvester;                