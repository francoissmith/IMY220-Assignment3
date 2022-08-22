function EventHandler(array) {
    this.array = array || [];
// ********************************** getEventsBetweenDates **********************************
    this.getEventsBetweenDates = (start, end) => {
        const inRange = events.filter(e => {
            return e.dateStart >= start && e.dateEnd <= end;
        });

        return inRange;
    }
// ********************************** getByMonth **********************************
    this.getByMonth = (month) => {
        const atDate = events.filter(e => {
            return e.dateStart.substring(5,7) == month;
        });

        return atDate;
    }
// ********************************** getUniqueDateAndSort **********************************
    this.getUniqueDateAndSort = () => {
        const sorted = events.sort((a,b) => {
            const startA = new Date(a.dateStart);
            const startB = new Date(b.dateStart);

            if (startA.getMonth() < startB.getMonth()) {
                return -1;
            }

            if(startA.getMonth() > startB.getMonth()) {
                return 1;
            }

            return 0;
        });

        const reduced = sorted.reduce((acc, curr) => {
            if (! acc.find(({dateStart, dateEnd}) => dateStart === curr.dateStart || dateEnd === curr.dateEnd)) {
                acc.push(curr);
            }

            return acc;
        }, []);

        return reduced;
    }
// ********************************** getSummary **********************************
    this.getSummary = (...args) => {
        var summary;
        if (args.length == 0) {
            summary = array.map(e => {
                return this.setSummary(e);
            });
        }
        else if (args.length > 0) {
            summary = args.map(arg => {
                if (arg.constructor === Array){
                    return arg.map(e => {
                        return this.setSummary(e);
                    });
                }
                else {
                    return this.setSummary(arg);
                }
            });
        }

        return summary;
    }
// ********************************** setSummary **********************************
    this.setSummary = (obj) => {
        if (obj.dateStart === obj.dateEnd) {
            return 'On ' + obj.dateStart + ':' + obj.name + '(' + obj.description + ')';
        }
        else {
            return 'From ' + obj.dateStart + ' to ' + obj.dateEnd + ': ' + obj.name + '(' + obj.description + ')';
        }
    }
}

Array.prototype.getEventsBetweenDates = function(start, end){
    return new EventHandler(this).getEventsBetweenDates(start, end);
}

Array.prototype.getByMonth = function(month){
    return new EventHandler(this).getByMonth(month);
}

Array.prototype.getUniqueDateAndSort = function(){
    return new EventHandler(this).getUniqueDateAndSort();
}

Array.prototype.getSummary = function(){
    return new EventHandler(this).getSummary();
}