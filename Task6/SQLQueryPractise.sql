drop database Akk
select count(*) from Employee join orders on Orders.EmployeeID = Employee.EmployeeID where OrderDate between '1996-10-15' and '1997-10-15'