var roleTransfer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.transfering && creep.carry.energy == 0) {
            creep.memory.transfering = false;
        }
        if (!creep.memory.transfering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transfering = true;
        }

        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        var secondary = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER &&
                    structure.energy < structure.energyCapacity) ||
                    (structure.structureType == STRUCTURE_TERMINAL &&
                        structure.store[RESOURCE_ENERGY] < 7000);
            }
        });
        var nuker = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_NUKER) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store[RESOURCE_ENERGY] < 2000;
            }
        });
        if (creep.memory.transfering) {
            if (target || secondary || nuker || container || creep.room.name == 'W44N3') {
                let link = Game.getObjectById('5ba0ca8f6e569208053397a7');
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else if (secondary) {
                    creep.say('Tower');
                    if (creep.transfer(secondary, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(secondary, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else if (nuker) {
                    creep.say('Nuke');
                    if (creep.transfer(nuker, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(nuker, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else if (container) {
                    creep.say('Container');
                    if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else if (creep.room.name == 'W44N3' && link.energy < 800) {
                    if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link);
                    }
                }
            } else {

                var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE);
                    }
                });

                if (creep.transfer(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(theStorage, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else {

            var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: (d) => { return (d.resourceType == RESOURCE_ENERGY) }
            });
            if (dropenergy) {
                if (creep.pos.findPathTo(dropenergy).length < 10 && creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                    creep.say('Dropped');
                    creep.moveTo(dropenergy, { visualizePathStyle: { stroke: '#ffffff' } })
                }
                let link = Game.getObjectById('5a74eed2d7b13136b10fdd86');
                let link01 = Game.getObjectById('5ba367bb5d746935e8da1972');
                                if (creep.room.name == 'W43N1' && creep.pos.findPathTo(link01).length < 15 && link01.energy > 100) {
                    console.log('link0: ');
                    if (creep.withdraw(link01, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link01);
                    }
                } else if (creep.room.name == 'W43N1' && link.energy > 150) {
                    console.log('link1: ');
                    let container = Game.getObjectById('5ba38a22581a7a26ab1b6c9f');
                    if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link);
                    }
                }
            } else {
                let link = Game.getObjectById('5a74eed2d7b13136b10fdd86');
                let link01 = Game.getObjectById('5ba367bb5d746935e8da1972');
                let link0 = Game.getObjectById('5a64ca3a77a3df759890fc4d');
                let link1 = Game.getObjectById('5a5a104b93afa519f70be0fe');
                let link2 = Game.getObjectById('5a5a30995dba65589ef3536f');
                const linkW41S6_H2 = Game.getObjectById('5cb33d1a2900f656461245ce');
                const linkW39S2_H4 = Game.getObjectById('5cb432fd18117a067e219409');
                const linkW41S7_H1 = Game.getObjectById('5cc5b04cd7cd8956c0551c96');
                const linkW44N2_H2 = Game.getObjectById('5d01203484b8d8099c0ecda9');

                if (creep.room.name == 'W43N1' && creep.pos.findPathTo(link01).length < 15 && link01.energy > 100) {
                    console.log('link0: ');
                    if (creep.withdraw(link01, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link01);
                    }
                } else if (creep.room.name == 'W43N1' && link.energy > 150) {
                    console.log('link1: ');
                    let container = Game.getObjectById('5ba38a22581a7a26ab1b6c9f');
                    if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link);
                    }
                } else if (creep.room.name == 'W43N2' && link0.energy > 300 && link1.energy > 750 && link2.energy > 750) {
                    if (creep.withdraw(link1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link1);
                    }
                } else if (creep.room.name == 'W41S6' && linkW41S6_H2.energy > 200) {
                    if (creep.withdraw(linkW41S6_H2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(linkW41S6_H2);
                    }
                } else if (creep.room.name == 'W39S2' && linkW39S2_H4.energy > 200) {
                    if (creep.withdraw(linkW39S2_H4, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(linkW39S2_H4);
                    }
                } else if (creep.room.name == 'W41S7' && linkW41S7_H1.energy > 200) {
                    if (creep.withdraw(linkW41S7_H1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(linkW41S7_H1);
                    }
                } else if (creep.room.name == 'W44N2' && linkW44N2_H2.energy > 200) {
                    if (creep.withdraw(linkW44N2_H2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(linkW44N2_H2);
                    }
                } else {

                    let linkST = Game.getObjectById('5bf85f273201436f49b05d88');
                    const linkUpgrader = Game.getObjectById('5c2f4e15c263555ecefe0190');
                    if (creep.room.name == 'W39S1' && linkST.energy >= 250 && linkUpgrader.energy >= 750) {
                        if (creep.withdraw(linkST, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(linkST);
                        }
                    } else {
                        var theStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 0);
                            }
                        });
                        if (creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(theStorage, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                        if (!theStorage) {
                            const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                            if (source) {
                                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(source);
                                }
                            }
                        }
                    }

                }
            }
        }
    }
};

module.exports = roleTransfer;
