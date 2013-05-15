package replaceme.model;

import org.junit.Before;
import org.junit.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static junit.framework.Assert.assertNotNull;

public class ToDoItemTest {

    ValidatorFactory factory;

    @Before
    public void setup() {
        factory = Validation.buildDefaultValidatorFactory();
    }

    @Test
    public void testToDoItem() throws Exception {

        ToDoItem toDoItem = new ToDoItem();

        Validator validator = factory.getValidator();

        Set<ConstraintViolation<ToDoItem>> constraintViolations = validator.validate(toDoItem);
        assertNotNull(constraintViolations);
    }
}
