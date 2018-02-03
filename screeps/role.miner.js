var roleMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.mining && creep.carryCapacity == _.sum(creep.carry)) {
            creep.memory.mining = false;
        }
        if (!creep.memory.mining && 0 == _.sum(creep.carry)) {
            creep.memory.mining = true;
        }

        if (creep.memory.mining) {
            var target;

            if (creep.memory.depositId) {
                target = Game.getObjectById(creep.memory.depositId);
            } else {
                var targets = creep.room.find(FIND_MINERALS);
                target = targets[0];
                creep.memory.depositId = target.id;
                creep.memory.mineralType = target.mineralType;
            }
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            if (creep.room.storage && target.mineralAmount == 0) {
                if(creep.withdraw(creep.room.storage, creep.memory.mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
        } else {
            if(creep.room.terminal) {
                if(creep.transfer(creep.room.terminal, creep.memory.mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                }
            } else if (creep.room.storage) {
                if(creep.transfer(creep.room.storage, creep.memory.mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
        }
    }
};

module.exports = roleMiner;