towers = Game.rooms['W43N1'].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
for (var id in towers) {
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'AlanopolisDefender' && creep.hits < creep.hitsMax);
    if (defenders[0]) {
        towers[id].heal(defenders[0]);
    }
    var closestDamagedStructure = towers[id].pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < (structure.hitsMax - WALL_STRENGTH['Alanopolis'])
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
            Game.notify('Hostile in Alanopolis(healer) killed: ', healer);
        }
    } else if (closestHostile) {
        towers[id].attack(closestHostile);
        if (closestHostile.hits < 100) {
            Game.notify('Hostile in Alanopolis(invader) killed: ', closestHostile);
        }
    }
    var roads = towers[id].pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function (object) {
            return ((object.structureType == STRUCTURE_RAMPART && (object.hits < object.hitsMax - RAMPART_STRENGTH['W43N1'])))
        }
    });
    if (roads) {
        towers[id].repair(roads);
    }
}
