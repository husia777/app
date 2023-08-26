class A:
    x = 1
x = lambda x: x
y = lambda y: y
print(x.__code__.co_code == y.__code__.co_code)