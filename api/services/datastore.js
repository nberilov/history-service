const { Datastore } = require('@google-cloud/datastore');

const config = require('../config');

const datastore = new Datastore({
    projectId: config.datastore.projectId,
});

class DatastoreService {
    save([kind, id], data) {
        const key = datastore.key([kind, id]);

        return datastore.save({
            key,
            data
        });
    }

    findByKey(kind, key) {
        const query = datastore.createQuery(kind)
            .filter('__key__', '=', datastore.key([kind, key]));
        return datastore.runQuery(query);
    }

    query(kind, options) {
        let query = datastore.createQuery(kind);

        if (options.filters && options.filters.length) {
            for (const filter of options.filters) {
                query = query.filter(...filter);
            }
        }

        if (options.select && options.select.length) {
            query = query.select(options.select);
        }

        if (options.order && options.order.length) {
            query = query.order(...options.order);
        }

        return datastore.runQuery(query);
    }
}

module.exports = new DatastoreService();