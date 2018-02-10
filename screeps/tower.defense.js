var tower = {

    defense: function (room, spawn) {

        var towers = Game.rooms[room].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
        for (var id in towers) {
            var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == spawn + 'Defender' && creep.hits < creep.hitsMax);
            if (defenders[0]) {
                towers[id].heal(defenders[0]);
            }
            var closestDamagedStructure = towers[id].pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < (structure.hitsMax - WALL_STRENGTH[spawn])
            });
            if (closestDamagedStructure) {
                towers[id].repair(closestDamagedStructure);
            }
            var closestHostile = towers[id].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            const healer = towers[id].pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function (object) {
                    return object.getActiveBodyparts(HEAL) > 0;
                }
            });
            if (healer) {
                towers[id].attack(healer);
                if (healer.hits < 100) {
                    Game.notify('Hostile in ' + spawn + '(healer) killed: ', healer);
                }
            } else if (closestHostile) {
                towers[id].attack(closestHostile);
                if (closestHostile.hits < 100) {
                    Game.notify('Hostile in ' + spawn + '(invader) killed: ', closestHostile);
                }
            }
            var roads = towers[id].pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (object) {
                    return ((object.structureType == STRUCTURE_RAMPART && (object.hits < object.hitsMax - RAMPART_STRENGTH[room])))
                }
            });
            if (roads) {
                towers[id].repair(roads);
            }
        }
    }
};

module.exports = tower;