package replaceme;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;

@RunWith(Arquillian.class)
public class E2ETest {

    @Deployment(testable = false)
    public static org.jboss.shrinkwrap.api.spec.WebArchive accessDeployment() {
        File war = MavenDependencyResolver.resolve(
                "replaceme",
                "replaceme-war",
                "1.0-SNAPSHOT",
                null,
                "war"
        );

        WebArchive webArchive = ShrinkWrap.createFromZipFile(WebArchive.class, war);

        String[] webResources = getTestWebResources();
        for (String webResource : webResources) {
            File res = new File(webResource);
            webArchive.addAsWebResource(res);
        }

        System.out.println(webArchive.toString(true));
        return webArchive;

    }

    private static String[] getTestWebResources() {

        return new String[]{
                resName("todoList-spec.js"),
                resName("runner.html"),
                resName("angular-scenario.js")
        };
    }

    private static final String TEST_RESOURCE_PREFIX = "src/test/webapp/";

    private static String resName(String fileName) {
        return TEST_RESOURCE_PREFIX + fileName;
    }


    @Test
    public void runE2ETest() {
        WebDriver driver = new FirefoxDriver();

        driver.get("http://localhost:8180/replaceme-war-1.0-SNAPSHOT/runner.html");

        ExpectedCondition e = new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return !d.findElement(By.id("application")).isDisplayed();
            }
        };
        Wait w = new WebDriverWait(driver, 20);
        w.until(e);

        WebElement error = driver.findElement(By.className("status-error"));
        WebElement failure = driver.findElement(By.className("status-failure"));
        WebElement success = driver.findElement(By.className("status-success"));

        System.out.println("\n\n\n------------------------------------------------------------------------");
        System.out.println("AngularJS End-to-End-Tests\n");

        System.out.println(error.getText());
        System.out.println(failure.getText());
        System.out.println(success.getText());

        System.out.println("------------------------------------------------------------------------\n\n\n");

        Assert.assertEquals(error.getText(), "0 Errors");
        Assert.assertEquals(failure.getText(), "0 Failures");

        driver.close();
    }

}
