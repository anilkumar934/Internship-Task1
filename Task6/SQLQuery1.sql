use [AnilDB]
--alter table employee add age int;
--alter table employee add salary float;
--update employee set age = DATEDIFF(YEAR,BirthDate,CURRENT_TIMESTAMP);
--update employee set salary = age*100;
select * from employee;




--1. Select firstname, lastname, title, age, salary for everyone in your employee table.
	select firstname,lastname,title,age,salary from employee;
--2. Select firstname, age and salary for everyone in your employee table.
	select firstname,age,salary from employee;
--3. Selct firstname and display as 'Name' for everyone in your employee table.
	select firstname as Name from employee;
--4. Select firstname and lastname as 'Name' for everyone.
	select firstname+'  '+lastname as Name from employee;
--Use " " (space) to separate firstname and last.


--Using 'where' clause.
--5. Select all columns for everyone with a salary over 6800. 
	select * from employee where salary > 6800;
--6. Select first and last names for everyone that's under 68 years old.
	select firstname [First Name],lastname [Last Name] from employee where age < 68;
--7. Select first name, last name, and salary for anyone with "Representative" in their title. 
	select firstname[First Name],lastname [Last Name],salary [Salary] 
	from employee where title like '%Representative%';
--8. Select all columns for everyone whose last name contains "O". 
	select * from employee where LastName like '%O%';
--9. Select the lastname for everyone whose first name equals "Robert". 
	select lastname [Last Name] from employee where FirstName = 'Robert';
--10. Select all columns for everyone whose last name ends in "an". 
	select * from employee where lastname like '%an';
--11. Select all columns for everyone who are 65 and above.
	select * from employee where age >= 65;





--Using multiple 'where' clauses
--12. Select firstname ,lastname,age and salary of everyone whose age is above 24 and below 43.
	select firstname [First Name],lastname [Last Name],age [Age],salary [Salary] 
	from employee where age > 65 and age  < 85 ;
--13. Select firstname, title and lastname whose age is in the range 28 and 62 and salary greater than 3100
	select firstname [First Name],title [Title],lastname [Last Name],age [Age],salary [Salary] 
	from employee where (age > 28 and age < 62) or salary > 3100;
--14. Select all columns for everyone whose age is not more than 68 and salary not less than 4100
	select * from employee where age <= 68 and  salary >= 4100; 
--15. Select firstname and age of everyone whose firstname starts with "An" and salary in the range 5500 and 6700
	select firstname [First Name],age [Age] from employee where firstname like 'An%' and (salary >= 5500 and salary <=6700);





--Using 'Order By' clause
--16. Select all columns for everyone by their ages in descending order.
	select * from employee order by age desc;
--17. Select all columns for everyone by their ages in ascending order.
	select * from employee order by age;
--18. Select all columns for everyone by their salaries in descending order.
	select * from employee order by salary desc;
--19. Select all columns for everyone by their salaries in ascending order.
	select * from employee order by salary;
--20. Select all columns for everyone by their salaries in ascending order whose age not less than 67.
	select * from employee where age >= 67 order by salary;
--21. Select all columns for everyone by their salaries in descending order whose age not more than 74.
	select * from employee where age <= 74 order by salary desc;




--Miscellaneous( count, sum(), max(), min())
--22. Select all columns for everyone by their length of firstname in ascending order.
	select * from employee order by len(firstname);
--23. Select the number of employees whose age is above 67
	select count(*) from employee where age > 67;
--24. Show the results by adding 5 to ages and removing 250 from salaries of all employees
	select firstname [First Name], age-5 [Age],salary-250 [Salary] from employee;
--25. Select the number of employees whose lastname ends with "ng" or "an"
	select count(*) from employee where lastname like '%an' or lastname like '%ng';
--26. Select the average salary of all your employees
	select avg(salary) [Avg Salary] from employee;
--27. Select the average salary of people from London
	select avg(salary) [Avg Salary] from employee where city = 'London';
--28. Select the average age of people from USA
	select avg(age) [Avg Salary] from employee where country = 'USA';
--29. Select the average salary of employees whose age is not less than 65 and not more than 89
	select avg(salary) [Avg Salary] from employee where not age < 65 and not age > 89;
--30. Select the number of sales representatives
	select count(*) from employee where title = 'sales representative';
--31. What percentage of sales representatives constitute your employees
	select ((count(*)*100)/(select count(*) from employee)) from employee where title = 'sales representative';
--32. What is the combined salary that you need to pay to the employees whose age is not less than 70
	select sum(salary) [Total Salary] from employee where age >= 70;
--33. What is the combined salary that you need to pay to all the UK and USA for 1 month
	select sum(salary)/12 [Total Salary] from employee where country in ( 'USA','UK');
--34. What is the combined salary that you need to pay to all the USA whose age is greater than 67 for 3years 
	select sum(salary)*3 [Total Salary] from employee where country = 'USA' and age > 67;



--Additional Mathematical operators


--Using Sub-Queries ( and usage of 'in' and 'between')
--35. Select the eldest employee's firstname, lastname and age whose salary is less than 7500
	select top 1 firstname,lastname,age from employee where salary < 7500 order by age desc;
--36. Who is the youngest sales representative
	select top 1 * from employee where title = 'sales representative' order by age ;
--37. Select the eldest fresher whose salary is less than 65000
	select top 1 * from employee where salary <6500 order by age ;
--38. Select firstname and age of everyone whose firstname starts with "An" or "M" and salary in the range 5700 and 8600
	select firstname,age from employee where firstname like 'An%' or firstname like 'M%' and salary between 5700 and 8600;





--Using 'Group By' and 'Having' clause
--39. How many employees are having each unique title. Select the title and display the number of employees present in ascending order
	select title,count(*) as [No.of Employees] from employee group by title order by [No.of Employees]
--40. What is the average salary of each unique title of the employees. Select the title and display the average salary of employees in each
	select title,avg(salary) as [Avg salary of title] from employee group by title;
--41. What is the average salary of employees excluding London
	select avg(salary) as [Avg salary of employees] from employee where not title = 'London'; 
--42. What is the average age of employees of each unique title.
	select title,avg(age) as [Age of title] from employee group by title;
--43. In the age range of 65 to 90 get the number of employees under each unique title.
	select title,count(*) [No of Employees] from employee group by title,age having age between 65 and 90;
--44. Show the average salary of each unique title of employees only if the average salary is not less than 6500
	select title,avg(salary) as [Avg salary of title] from employee group by title having not avg(salary) < 6500;
--45. Show the sum of ages of each unique title of employee only if the sum of age is greater than 60
	select sum(age) as [sum of ages of title] from employee group by title having not sum(age) < 60;
	




--Basic Data Modification


--Using 'Update'
--∑ janet leverling just got married to Michael Moore. She has requested that her last name be updated to Moore. 
	update employee set LastName = 'Moore' where firstname = 'janet' and lastname = 'leverling';
--∑ steven buchanan's birthday is today, add 1 to his age and a bonus of 500
	update employee set age += 1,salary += 500 where FirstName = 'steven' and lastname = 'buchanan';
--∑ All 'Programmer's are now called "Engineer"s. Update all titles accordingly. 
	update employee set title = 'sales representatives' where title = 'sales representative';
--∑ Everyone whose making under 7000 are to receive a 350 bonus. 
	update employee set salary += 350 where salary < 7000;
--∑ Everyone whose making over 8500 are to be deducted 15% of their salarie
	update employee set salary *= 0.85 where salary > 8500;