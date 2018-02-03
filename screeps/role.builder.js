var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.idle = false;
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }
        
	    if(creep.memory.building) {
	        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                var roads = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: function(object){ 
                    return (object.structureType === STRUCTURE_ROAD && (object.hits < object.hitsMax)) ||
                           (object.structureType === STRUCTURE_CONTAINER && (object.hits < object.hitsMax)) ||
                           (object.structureType == STRUCTURE_RAMPART && (object.hits < object.hitsMax-RAMPART_STRENGTH[creep.room.name])) ||
                           (object.structureType == STRUCTURE_WALL && (object.hits < object.hitsMax-WALL_BUILDER_STRENGTH[creep.room.name]))
                }});
                if(roads) {
                    if(creep.repair(roads) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roads, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    console.log('nothing to repair', creep.room);
                    creep.memory.idle = true;
                }
                
            }
	    }
	    else {
	        console.log('build going ot source...', creep.room.name);
            const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
	        //var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }

        //if(!sources[1].energy){
            var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 300 );
                }
            });
            
            if ( creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo( theStorage );
            }

        //}

	    }
	}
};

module.exports = roleBuilder;