package replaceme.model;

import junit.framework.Assert;
import org.junit.Before;
import org.junit.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

public class ToDoListTest {


    ValidatorFactory factory;

    @Before
    public void setup() {
        factory = Validation.buildDefaultValidatorFactory();
    }

    @Test(expected = IllegalArgumentException.class)
    public void testNullToDoItem() throws Exception {
        ToDoList list = new ToDoList();
        list.addToDoItem(null);
    }


    @Test
    public void testNameAndDescriptionViolation() throws Exception {


        ToDoList list = new ToDoList();

        Validator validator = factory.getValidator();
        Set<ConstraintViolation<ToDoList>> constraintViolations = validator.validate(list);
        Assert.assertNotNull(constraintViolations);


    }
}
