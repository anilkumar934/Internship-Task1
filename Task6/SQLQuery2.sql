use [AnilDB]
--'Joins'
select * from orders
select * from Employee
select * from Products
select * from Shippers
select * from OrderDetails;
select * from suppliers


--1. Get the firstname and lastname of the employees who placed orders between 15th August,1996 and 15th August,1997.


	select distinct firstname,lastname from employee 
	join orders on Orders.EmployeeID = Employee.EmployeeID 
	where OrderDate between '1996-08-15' and '1997-08-15';



--2. Get the distinct EmployeeIDs who placed orders before 16th October,1996

	select distinct employee.EmployeeID,OrderDate from employee 
	join orders on Orders.EmployeeID = Employee.EmployeeID 
	where OrderDate < '1996-10-16';


--3. How many products were ordered in total by all employees between 13th of January,1997 and 16th of April,1997.

	select count(orderid) as [No Of Orders] from employee 
	join orders on Orders.EmployeeID = Employee.EmployeeID 
	where OrderDate between '1997-01-13' and '1997-04-16';


--4. What is the total quantity of products for which Anne Dodsworth placed orders between 13th of January,1997 and 16th of April,1997.

	select sum(OrderDetails.Quantity) [Total Quantity of orders] from OrderDetails 
	join Orders on OrderDetails.OrderID = Orders.OrderID 
	join Employee on Orders.EmployeeID = Employee.EmployeeID 
	where employee.FirstName = 'Anne' and employee.LastName = 'Dodsworth' 
	and OrderDate between '1997-01-13' and '1997-04-16';


--5. How many orders have been placed in total by Robert King

	select count(distinct OrderDetails.OrderID) from OrderDetails 
	join orders on Orders.OrderID = OrderDetails.OrderID
	join Employee on Orders.EmployeeID = Employee.EmployeeID 
	where employee.FirstName = 'Robert' and Employee.LastName = 'king'; 


--6. How many products have been ordered by Robert King between 15th August,1996 and 15th August,1997

	select count(distinct OrderDetails.ProductID) from OrderDetails 
	join orders on Orders.OrderID = OrderDetails.OrderID
	join Employee on Orders.EmployeeID = Employee.EmployeeID 
	where employee.FirstName = 'Robert' and Employee.LastName = 'king'
	and OrderDate between '1996-08-15' and '1997-08-15'; 


--7. I want to make a phone call to the employees to wish them on the occasion of Christmas who placed 
--	orders between 13th of January,1997 and 16th of April,1997. I want the EmployeeID, Employee Full Name, HomePhone Number.

	select distinct Employee.EmployeeID as [ID], Employee.FirstName+' '+Employee.LastName as [Full Name],
	Employee.HomePhone as [Home phone] from Employee 
	join Orders on orders.EmployeeID = Employee.EmployeeID 
	join OrderDetails on OrderDetails.OrderID = Orders.OrderID 
	where OrderDate between '1997-01-13' and'1997-04-16';


--8. Which product received the most orders. Get the product's ID and Name and number of orders it received.

	select top 1 Products.ProductID,Products.ProductName,count(Orderdetails.OrderID) as [Number of orders] from OrderDetails 
	join Products on Products.ProductID = OrderDetails.ProductID 
	group by Products.ProductID,Products.ProductName order by count(Orderdetails.OrderID) desc; 


--9. Which are the least shipped products. List only the top 5 from your list.

	select top 5 Products.ProductID,Products.ProductName,count(Orderdetails.OrderID) as [Number of orders]  from OrderDetails 
	join Products on Products.ProductID = OrderDetails.ProductID 
	group by Products.ProductID,Products.ProductName order by count(Orderdetails.OrderID);  


--10. What is the total price that is to be paid by Laura Callahan for the order placed on 13th of January,1997

	select (UnitPrice*Quantity)*(1-Discount) from OrderDetails 
	join Orders on OrderDetails.OrderID = Orders.OrderID 
	join Employee on Employee.EmployeeID = Orders.EmployeeID
	where FirstName = 'Laura' and LastName = 'callahan' and OrderDate = '1997-01-13';


--11. How many number of unique employees placed orders for Gorgonzola Telino or Gnocchi di nonna Alice or 
		--Raclette Courdavault or Camembert Pierrot in the month January,1997

	select count(distinct EmployeeID) [No of Employees] from orders 
	join OrderDetails on OrderDetails.OrderID = Orders.OrderID 
	join Products on Products.ProductID = OrderDetails.ProductID 
	where ProductName in ('Gorgonzola Telino','Gnocchi di nonna Alice','Raclette Courdavault','Camembert Pierrot')
	and OrderDate between '1996-12-31' and '1997-02-01';


--12. What is the full name of the employees who ordered Tofu between 13th of January,1997 and 30th of January,1997

	select distinct firstname+' '+lastname [No of Employees] from orders 
	join Employee on Employee.EmployeeID = orders.EmployeeID
	join OrderDetails on OrderDetails.OrderID = Orders.OrderID 
	join Products on Products.ProductID = OrderDetails.ProductID 
	where ProductName = 'Tofu'and OrderDate between '1997-01-13' and '1997-12-30';


--13. What is the age of the employees in days, months and years who placed orders during the month of August.
	--Get employeeID and full name as well

	select distinct DATEDIFF(DAY,BirthDate,CURRENT_TIMESTAMP) [Age in days], 
	DATEDIFF(MONTH,birthdate,CURRENT_TIMESTAMP) [Age in months],
	DATEDIFF(year,birthdate,CURRENT_TIMESTAMP) [Age in years] ,
	Employee.EmployeeID [Employee ID],FirstName+' '+LastName [Full Name] from Employee
	join orders on Employee.EmployeeID = Orders.EmployeeID 
	where month(OrderDate) = 8;


--14. Get all the shipper's name and the number of orders they shipped

	select CompanyName [Shipper Name],count(OrderID) [No of Orders] from Shippers 
	join orders on Orders.ShipperID = Shippers.ShipperID
	group by CompanyName;

	
--15. Get the all shipper's name and the number of products they shipped.

	select CompanyName [Shipper Name],count(ProductName) [No of products Shipped] from Shippers 
	join orders on orders.ShipperID = shippers.ShipperID
	join OrderDetails on OrderDetails.OrderID = orders.OrderID
	join products on OrderDetails.ProductID = Products.ProductID
	group by CompanyName


--16. Which shipper has bagged most orders. Get the shipper's id, name and the number of orders.
-- 1 Name1
-- 2 Name2
-- 3 Name2

	select top 1 shippers.ShipperID,CompanyName,count(OrderID) [Shipper Name] from shippers
	join orders on orders.ShipperID = shippers.ShipperID 
	group by shippers.ShipperID,CompanyName
	order by count(OrderID) desc;


--17. Which shipper supplied the most number of products between 10th August,1996 and 20th 
		--September,1998. Get the shipper's name and the number of products.

	select top 1 CompanyName [shipper Name],count(ProductID) [No of products] from shippers 
	join orders on shippers.ShipperID = orders.ShipperID 
	join OrderDetails on OrderDetails.OrderID = Orders.OrderID
	group by CompanyName order by count(productid) desc;


--18. Which employee didn't order any product 4th of April 1997

	select distinct (FirstName+' '+LastName) [Full Name] from Employee 
	join orders on Orders.EmployeeID = Employee.EmployeeID 
	where not OrderDate = '1997-04-04';


--19. How many products where shipped to Steven Buchanan

	select count(distinct productid) [No of Products]from OrderDetails 
	join orders on OrderDetails.OrderID = Orders.OrderID
	join Employee on orders.EmployeeID = Employee.EmployeeID
	where FirstName = 'steven' and LastName = 'buchanan';


--20. How many orders where shipped to Michael Suyama by Federal Shipping

	select count(distinct orderid) [No of Orders] from orders 
	join Employee on Employee.EmployeeID = orders.EmployeeID
	join shippers on shippers.ShipperID = orders.ShipperID
	where FirstName = 'michael' and LastName = 'suyama' and CompanyName = 'federal shipping';


--21. How many orders are placed for the products supplied from UK and Germany


	select count(distinct orders.OrderID) from orders 
	join OrderDetails on OrderDetails.OrderID = Orders.OrderID
	join Products on Products.ProductID = OrderDetails.ProductID
	join Suppliers on Suppliers.SupplierID = Products.SupplierID
	where Suppliers.Country in ('uk','germany')


--22. How much amount Exotic Liquids received due to the order placed for its products in the month of January,1997

	select sum(products.UnitPrice*UnitsOnOrder) [Quantity of Exotic liuids] from suppliers 
	join products on Suppliers.SupplierID = Products.ProductID
	join OrderDetails on OrderDetails.ProductID = Products.ProductID
	join orders on orders.OrderID = OrderDetails.OrderID
	where MONTH(OrderDate) = 1 and year(OrderDate) = 1997;


--23. In which days of January, 1997, the supplier Tokyo Traders haven't received any orders.

	with dates as(
		select CAST('1997-01-01' as date) as All_Dates
		union all
		select DATEADD(day,1,All_dates) from dates
		where All_Dates < '1997-01-31')
	select all_dates as [Missing Dates] from dates
	where All_Dates not in (
	select orderdate from orders
	join OrderDetails on Orders.OrderID = OrderDetails.OrderID
	join Products on products.ProductID = OrderDetails.ProductID
	join Suppliers on suppliers.SupplierID = Products.SupplierID
	where Suppliers.CompanyName = 'Tokyo Traders' and MONTH(OrderDate) = 1 and year(OrderDate) = 1997);


--24. Which of the employees did not place any order for the products supplied by Ma Maison in the month of May


	select distinct firstname + ' '+ lastname [Employee Name] from Employee
	join orders on orders.EmployeeID = Employee.EmployeeID
	join OrderDetails on Orders.OrderID = OrderDetails.OrderID
	join Products on products.ProductID = OrderDetails.ProductID
	join Suppliers on suppliers.SupplierID = Products.SupplierID
	where Suppliers.CompanyName = 'Ma Maison' and month(OrderDate) = 5;


--25. Which shipper shipped the least number of products for the month of September and October,1997 combined.

	select top 1  CompanyName,count(products.productid) from shippers
	join Orders on orders.ShipperID = shippers.ShipperID
	join OrderDetails on OrderDetails.OrderID = Orders.OrderID
	join products on Products.ProductID = OrderDetails.ProductID
	where month(OrderDate) in (9,10) group by CompanyName order by count(products.productid);


--26. What are the products that weren't shipped at all in the month of August, 1997

	select ProductName from products 
	where ProductID not in
	(select distinct ProductID from OrderDetails
	join orders on orders.OrderID = OrderDetails.OrderID
	where month(shippeddate) = 8 and year(ShippedDate) = 1997);


--27. What are the products that weren't ordered by each of the employees. List each employee and the products that he didn't order.

	 select employee.EmployeeID,FirstName,Products.ProductID,Products.ProductName
	 from Employee cross join Products
	 where NOT Exists 
		(select * from orders 
		join OrderDetails on OrderDetails.OrderID = Orders.OrderID
		where Orders.EmployeeID = Employee.EmployeeID and OrderDetails.ProductID = Products.ProductID)


--28. Who is busiest shipper in the months of April, May and June during the year 1996 and 1997

	select top 1 CompanyName from shippers
	join orders on shippers.ShipperID = Orders.ShipperID
	join OrderDetails on OrderDetails.OrderID = Orders.OrderID
	where month(OrderDate) in (4,5,6) and year(OrderDate) in (1996,1997) 
	group by CompanyName order by count(orders.OrderID) desc;


--29. Which country supplied the maximum products for all the employees in the year 1997

	select top 1 CompanyName ,count(OrderDetails.ProductID) from Suppliers 
	join Products on Products.SupplierID = Suppliers.SupplierID
	join OrderDetails on Products.ProductID = OrderDetails.ProductID
	join orders on orders.OrderID =OrderDetails.OrderID
	group by CompanyName order by count(OrderDetails.ProductID) desc;


--30. What is the average number of days taken by all shippers to ship the product after the order has been placed by the employees

	select CompanyName,avg(datediff(DAY,OrderDate,ShippedDate)) from orders
	join Shippers on Shippers.ShipperID = Orders.ShipperID
	group by CompanyName ;


--31. Who is the quickest shipper of all.

	select top 1 CompanyName,avg(datediff(DAY,OrderDate,ShippedDate)) from orders
	join Shippers on Shippers.ShipperID = Orders.ShipperID
	group by CompanyName order by avg(datediff(DAY,OrderDate,ShippedDate));


--32. Which order took the least number of shipping days. Get the orderid, employees full name, number of products, number of days took to ship and shipper company name.

	select top 1 OrderDetails.orderid [order Id],firstname+' '+lastname [Employee Name],
	count(OrderDetails.ProductID) [No of products],
	datediff(DAY,OrderDate,ShippedDate) [No of Days],CompanyName from orders
	join shippers on shippers.ShipperID = orders.ShipperID
	join OrderDetails on orders.OrderID = OrderDetails.OrderID
	join Employee on orders.EmployeeID = Employee.EmployeeID
	where datediff(DAY,OrderDate,ShippedDate)>=1
	group by OrderDetails.OrderID,firstname,lastname,ShippedDate,OrderDate,CompanyName
	order by datediff(DAY,OrderDate,ShippedDate);



select * from orders
select * from Employee
select * from Products
select * from Shippers
select * from OrderDetails;
select * from suppliers

create fulltext catalog textsearch;
create fulltext index on employee(FirstName,LastName) key index employee_id
select * from Employee where contains(FirstName,'John');