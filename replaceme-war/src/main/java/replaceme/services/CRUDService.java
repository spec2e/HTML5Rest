package replaceme.services;

import replaceme.model.Resource;

import java.util.List;

public abstract class CRUDService<T extends Resource> {

    public abstract T create(T resource);

    public abstract T read(String id);

    public abstract T update(T resource);

    public abstract void delete(T resource);

    public abstract List<T> all();

}
