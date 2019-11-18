var roleMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.mining && creep.carryCapacity == _.sum(creep.carry)) {
            creep.memory.mining = false;
        }
        if (!creep.memory.mining && 0 == _.sum(creep.carry)) {
            creep.memory.mining = true;
        }
        // MARKOPOLIS
        var targetMark;
        var mineralId = Game.spawns['Markopolis'].memory.mineralId;
        if (mineralId) {
            targetMark = Game.getObjectById(mineralId);
        } else {
            var targets = Game.spawns['Markopolis'].room.find(FIND_MINERALS);
            targetMark = targets[0];
            Game.spawns['Markopolis'].memory.mineralId = targetMark.id;
            Game.spawns['Markopolis'].memory.mineralType = targetMark.mineralType;
        }
        var labsMark = Game.rooms['W43N3'].find(FIND_MY_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_LAB
            }
        });

        labsMark[0].runReaction(labsMark[1], labsMark[2]);
        labsMark[5].runReaction(labsMark[1], labsMark[2]);
        labsMark[6].runReaction(labsMark[1], labsMark[2]);
        // ALANOPOLIS
        var targetSteven;
        var mineralId = Game.spawns['Stevenopolis'].memory.mineralId;
        if (mineralId) {
            targetSteven = Game.getObjectById(mineralId);
        } else {
            var targets = Game.spawns['Stevenopolis'].room.find(FIND_MINERALS);
            targetSteven = targets[0];
            Game.spawns['Stevenopolis'].memory.mineralId = targetSteven.id;
            Game.spawns['Stevenopolis'].memory.mineralType = targetSteven.mineralType;
        }
        var labsSteven = Game.rooms['W43N2'].find(FIND_MY_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_LAB
            }
        });
        labsSteven[2].runReaction(labsSteven[0], labsSteven[1]);
        labsSteven[6].runReaction(labsSteven[0], labsSteven[1]);
        labsSteven[7].runReaction(labsSteven[0], labsSteven[1]);
        labsSteven[8].runReaction(labsSteven[0], labsSteven[1]);
        labsSteven[9].runReaction(labsSteven[0], labsSteven[1]);
        // STEVENOPOLIS
        var targetAlan;
        var mineralId = Game.spawns['Alanopolis'].memory.mineralId;
        if (mineralId) {
            targetAlan = Game.getObjectById(mineralId);
        } else {
            var targets = Game.spawns['Alanopolis'].room.find(FIND_MINERALS);
            targetAlan = targets[0];
            Game.spawns['Alanopolis'].memory.mineralId = targetAlan.id;
            Game.spawns['Alanopolis'].memory.mineralType = targetAlan.mineralType;
        }
        var labsAlan = Game.rooms['W43N1'].find(FIND_MY_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_LAB
            }
        });
        labsAlan[0].runReaction(labsAlan[2], labsAlan[1]);
        labsAlan[3].runReaction(labsAlan[2], labsAlan[1]);
        labsAlan[4].runReaction(labsAlan[2], labsAlan[1]);

        if (creep.room.name == 'W43N3' && targetMark.mineralAmount == 0) {
            console.log('0', labsMark[0].mineralAmount); //420
            console.log('1', labsMark[1].mineralAmount); //30
            console.log('2', labsMark[2].mineralAmount); //0
            // PUT H in LAB 1...
            if (creep && labsMark[2].mineralAmount < 2500 && labsMark[0].mineralAmount < 2500 && !creep.carry[RESOURCE_OXYGEN]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                    creep.say('Get H');
                    creep.moveTo(creep.room.terminal);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry)) {
                    creep.say('Dump H');
                    if (creep.transfer(labsMark[2], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(labsMark[2]);
                    }
                }
            } else if (creep && labsMark[2].mineralAmount == 3000 && creep.carry[RESOURCE_HYDROGEN] > 0) {
                creep.say('Empty H');
                if (creep.transfer(creep.room.terminal, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT O in LAB 2...
            if (creep && labsMark[1].mineralAmount < 2500 && labsMark[2].mineralAmount > 2500 && labsMark[0].mineralAmount < 2500 && !creep.carry[RESOURCE_HYDROGEN]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                    creep.say('Get O');
                    creep.moveTo(creep.room.terminal);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry)) {
                    creep.say('Dump O');
                    if (creep.transfer(labsMark[1], RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(labsMark[1]);
                    }
                }
            } else if (creep && labsMark[1].mineralAmount == 3000 && creep.carry[RESOURCE_OXYGEN] > 0) {
                creep.say('Empty O');
                if (creep.transfer(creep.room.terminal, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT OH in Terminal...
            if (creep && labsMark[0].mineralAmount > 500 && !creep.carry[RESOURCE_OXYGEN] && !creep.carry[RESOURCE_HYDROGEN]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(labsMark[0], RESOURCE_HYDROXIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get OH');
                    creep.moveTo(labsMark[0]);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry) && creep.transfer(creep.room.terminal, RESOURCE_HYDROXIDE) == ERR_NOT_IN_RANGE && creep.carry[RESOURCE_HYDROXIDE] > 0) {
                    creep.say('Dump OH');
                    creep.moveTo(creep.room.terminal);
                }
            }
            if (creep && labsMark[6].mineralAmount > 500 && !creep.carry[RESOURCE_OXYGEN] && !creep.carry[RESOURCE_HYDROGEN]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(labsMark[6], RESOURCE_HYDROXIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get OH');
                    creep.moveTo(labsMark[6]);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry) && creep.transfer(creep.room.terminal, RESOURCE_HYDROXIDE) == ERR_NOT_IN_RANGE && creep.carry[RESOURCE_HYDROXIDE] > 0) {
                    creep.say('Dump OH');
                    creep.moveTo(creep.room.terminal);
                }
            }
            if (creep && labsMark[5].mineralAmount > 500 && !creep.carry[RESOURCE_OXYGEN] && !creep.carry[RESOURCE_HYDROGEN]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(labsMark[5], RESOURCE_HYDROXIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get OH');
                    creep.moveTo(labsMark[5]);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry) && creep.transfer(creep.room.terminal, RESOURCE_HYDROXIDE) == ERR_NOT_IN_RANGE && creep.carry[RESOURCE_HYDROXIDE] > 0) {
                    creep.say('Dump OH');
                    creep.moveTo(creep.room.terminal);
                }
            }
        } else if (creep.room.name == 'W43N2' && targetSteven.mineralAmount == 0) {
            // PUT O in LAB 1
            if (creep && labsSteven[0].mineralAmount < 2500 && labsSteven[1].mineralAmount < 2500 && labsSteven[2].mineralAmount < 2500 && !creep.carry[RESOURCE_LEMERGIUM]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                    creep.say('Get O');
                    creep.moveTo(creep.room.terminal);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry)) {
                    creep.say('Dump O');
                    if (creep.transfer(labsSteven[0], RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(labsSteven[0]);
                    }
                }
            } else if (creep && labsSteven[0].mineralAmount == 2500 && creep.carry[RESOURCE_OXYGEN] > 0) {
                creep.say('Empty O');
                if (creep.transfer(creep.room.terminal, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT L in LAB 2
            if (creep && labsSteven[0].mineralAmount > 2500 && labsSteven[1].mineralAmount < 2500 && labsSteven[2].mineralAmount < 2500 && !creep.carry[RESOURCE_OXYGEN]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.say('Get L');
                    creep.moveTo(creep.room.terminal);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry)) {
                    creep.say('Dump L');
                    if (creep.transfer(labsSteven[1], RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(labsSteven[1]);
                    }
                }
            } else if (creep && labsSteven[1].mineralAmount == 2500 && creep.carry[RESOURCE_LEMERGIUM] > 0) {
                creep.say('Empty L');
                if (creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT LO in Terminal
            if (creep && labsSteven[2].mineralAmount > 400 && !creep.carry[RESOURCE_OXYGEN] && !creep.carry[RESOURCE_LEMERGIUM]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(labsSteven[2], RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get LO');
                    creep.moveTo(labsSteven[2]);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry) && creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE && creep.carry[RESOURCE_LEMERGIUM_OXIDE] > 0) {
                    creep.say('Dump LO');
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT LO in Terminal
            if (creep && labsSteven[6].mineralAmount > 400 && !creep.carry[RESOURCE_OXYGEN] && !creep.carry[RESOURCE_LEMERGIUM]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(labsSteven[6], RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get LO');
                    creep.moveTo(labsSteven[6]);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry) && creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE && creep.carry[RESOURCE_LEMERGIUM_OXIDE] > 0) {
                    creep.say('Dump LO');
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT LO in Terminal
            if (creep && labsSteven[7].mineralAmount > 400 && !creep.carry[RESOURCE_OXYGEN] && !creep.carry[RESOURCE_LEMERGIUM]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(labsSteven[7], RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get LO');
                    creep.moveTo(labsSteven[7]);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry) && creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE && creep.carry[RESOURCE_LEMERGIUM_OXIDE] > 0) {
                    creep.say('Dump LO');
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT LO in Terminal
            if (creep && labsSteven[8].mineralAmount > 400 && !creep.carry[RESOURCE_OXYGEN] && !creep.carry[RESOURCE_LEMERGIUM]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(labsSteven[8], RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get LO');
                    creep.moveTo(labsSteven[8]);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry) && creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE && creep.carry[RESOURCE_LEMERGIUM_OXIDE] > 0) {
                    creep.say('Dump LO');
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT LO in Terminal
            if (creep && labsSteven[9].mineralAmount > 400 && !creep.carry[RESOURCE_OXYGEN] && !creep.carry[RESOURCE_LEMERGIUM]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(labsSteven[9], RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get LO');
                    creep.moveTo(labsSteven[9]);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry) && creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE && creep.carry[RESOURCE_LEMERGIUM_OXIDE] > 0) {
                    creep.say('Dump LO');
                    creep.moveTo(creep.room.terminal);
                }
            }
        } else if (creep.room.name == 'W43N1' && targetAlan.mineralAmount == 0) {
            // PUT LO in LAB 1
            if (creep && labsAlan[2].mineralAmount <= 2500 && labsAlan[0].mineralAmount < 2500 && !creep.carry[RESOURCE_LEMERGIUM_ALKALIDE]) {
                console.log('LO...');
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get LO');
                    creep.moveTo(creep.room.terminal);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry)) {
                    creep.say('Dump LO');
                    if (creep.transfer(labsAlan[2], RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(labsAlan[2]);
                    }
                }
            } else if (creep && labsAlan[2].mineralAmount > 2500 && creep.carry[RESOURCE_LEMERGIUM_OXIDE] > 0) {
                creep.say('Empty LO');
                if (creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT OH in LAB 2
            if (creep && labsAlan[2].mineralAmount > 2500 && labsAlan[1].mineralAmount < 2500 && labsAlan[0].mineralAmount < 2500 && !creep.carry[RESOURCE_LEMERGIUM_OXIDE]) {
                console.log('OH...');
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(creep.room.terminal, RESOURCE_HYDROXIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get OH');
                    creep.moveTo(creep.room.terminal);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry)) {
                    creep.say('Dump OH');
                    if (creep.transfer(labsAlan[1], RESOURCE_HYDROXIDE) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(labsAlan[1]);
                    }
                }
            } else if (creep && labsAlan[1].mineralAmount > 2500 && creep.carry[RESOURCE_HYDROXIDE] > 0) {
                creep.say('Empty OH');
                if (creep.transfer(creep.room.terminal, RESOURCE_HYDROXIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT LHO2 in Terminal
            if (creep && labsAlan[0].mineralAmount > 250 && !creep.carry[RESOURCE_LEMERGIUM_OXIDE] && !creep.carry[RESOURCE_HYDROXIDE]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(labsAlan[0], RESOURCE_LEMERGIUM_ALKALIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get LHO2');
                    creep.moveTo(labsAlan[0]);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry) && creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_ALKALIDE) == ERR_NOT_IN_RANGE && creep.carry[RESOURCE_LEMERGIUM_ALKALIDE] > 0) {
                    creep.say('Dump LHO2');
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT LHO2 in Terminal
            if (creep && labsAlan[3].mineralAmount > 250 && !creep.carry[RESOURCE_LEMERGIUM_OXIDE] && !creep.carry[RESOURCE_HYDROXIDE]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(labsAlan[3], RESOURCE_LEMERGIUM_ALKALIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get LHO2');
                    creep.moveTo(labsAlan[3]);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry) && creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_ALKALIDE) == ERR_NOT_IN_RANGE && creep.carry[RESOURCE_LEMERGIUM_ALKALIDE] > 0) {
                    creep.say('Dump LHO2');
                    creep.moveTo(creep.room.terminal);
                }
            }
            // PUT LHO2 in Terminal
            if (creep && labsAlan[4].mineralAmount > 250 && !creep.carry[RESOURCE_LEMERGIUM_OXIDE] && !creep.carry[RESOURCE_HYDROXIDE]) {
                if (creep && 0 == _.sum(creep.carry) && creep.withdraw(labsAlan[4], RESOURCE_LEMERGIUM_ALKALIDE) == ERR_NOT_IN_RANGE) {
                    creep.say('Get LHO2');
                    creep.moveTo(labsAlan[4]);
                } else if (creep && creep.carryCapacity >= _.sum(creep.carry) && creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_ALKALIDE) == ERR_NOT_IN_RANGE && creep.carry[RESOURCE_LEMERGIUM_ALKALIDE] > 0) {
                    creep.say('Dump LHO2');
                    creep.moveTo(creep.room.terminal);
                }
            }
        } else if (creep.memory.mining) {
            var target;
            if (creep.memory.depositId) {
                target = Game.getObjectById(creep.memory.depositId);
            } else {
                var targets = creep.room.find(FIND_MINERALS);
                target = targets[0];
                creep.memory.depositId = target.id;
                creep.memory.mineralType = target.mineralType;
            }
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            if (creep.room.storage && target.mineralAmount == 0) {
                if (creep.withdraw(creep.room.storage, creep.memory.mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
        } else {
            if (creep.room.terminal && (_.sum(creep.room.terminal.store) / creep.room.terminal.storeCapacity) < 1) {
                console.log('terminal: ', creep.room.terminal.storeCapacity)
                if (creep.transfer(creep.room.terminal, creep.memory.mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                }
            } else {
                var lab = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => { return (structure.structureType == STRUCTURE_LAB); }
                });

                if (lab && creep.transfer(lab, creep.memory.mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(lab);
                }
            }
        }
    }
};

module.exports = roleMiner;